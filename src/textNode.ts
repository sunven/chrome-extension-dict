const getNodesIfSameStartEnd = (node: Text, startOffset: number, endOffset: number) => {
  node.splitText(startOffset)
  const passedNode = node.nextSibling as Text
  if (!passedNode) {
    return []
  }
  passedNode.splitText(endOffset - startOffset)
  return [
    {
      node: passedNode,
      type: 'text',
      splitType: 'both',
    },
  ]
}

const getSelectedNodes = (
  startNode: Text,
  startOffset: number,
  endNode: Text,
  endOffset: number,
  root: Node,
) => {
  // split current node when the start-node and end-node is the same
  if (startNode === endNode) {
    return getNodesIfSameStartEnd(startNode, startOffset, endOffset)
  }

  const nodeStack: [Node] = [root]
  const selectedNodes = []

  let withinSelectedRange = false
  let curNode = null

  while ((curNode = nodeStack.pop())) {
    const children = curNode.childNodes
    for (let i = children.length - 1; i >= 0; i--) {
      nodeStack.push(children[i])
    }

    // only collect text nodes
    if (curNode === startNode) {
      if (curNode.nodeType === 3) {
        const node = curNode as Text
        node.splitText(startOffset)
        const { nextSibling } = node
        if (nextSibling) {
          selectedNodes.push({
            node: nextSibling as Text,
            type: 'text',
            splitType: 'head',
          })
        }
      }

      // meet the start-node (begin to traverse)
      withinSelectedRange = true
    } else if (curNode === endNode) {
      if (curNode.nodeType === 3) {
        const node = curNode as Text
        node.splitText(endOffset)
        selectedNodes.push({
          node,
          type: 'text',
          splitType: 'tail',
        })
      }
      // meet the end-node
      break
    }
    // handle text nodes between the range
    else if (withinSelectedRange && curNode.nodeType === 3) {
      selectedNodes.push({
        node: curNode as Text,
        type: 'text',
        splitType: 'none',
      })
    }
  }
  return selectedNodes
}

export function highlight(
  startNode: Text,
  startOffset: number,
  endNode: Text,
  endOffset: number,
  root: Node = document.body,
) {
  const nodes = getSelectedNodes(startNode, startOffset, endNode, endOffset, root)
  nodes.forEach(({ node }) => {
    const wrap = document.createElement('span')
    wrap.setAttribute('class', 'highlight')
    wrap.appendChild(node.cloneNode(false))
    node.parentNode?.replaceChild(wrap, node)
  })
}

const getOriginParent = (node: Text) => {
  // 有嵌套问题
  if (node instanceof HTMLElement) {
    return node
  }
  return node.parentElement
}
function getTextPreOffset(parentElement: HTMLElement, text: Text) {
  const nodeStack: [Node] = [parentElement]
  let curNode = null
  let offset = 0
  while ((curNode = nodeStack.pop())) {
    const children = curNode.childNodes
    for (let i = children.length - 1; i >= 0; i--) {
      nodeStack.push(children[i])
    }

    if (curNode.nodeType === 3 && curNode !== text) {
      offset += curNode.textContent!.length
    } else if (curNode.nodeType === 3) {
      break
    }
  }

  return offset
}

const countGlobalNodeIndex = (element: HTMLElement, root: HTMLElement) => {
  const { tagName } = element
  const list = root.getElementsByTagName(tagName)
  for (let i = 0; i < list.length; i++) {
    if (element === list[i]) {
      return i
    }
  }
  return -1
}

const getDomMeta = (node: Text, offset: number, root: HTMLElement) => {
  const originParent = getOriginParent(node)
  if (!originParent) {
    return null
  }
  const index = countGlobalNodeIndex(originParent, root)
  const preNodeOffset = getTextPreOffset(originParent, node)
  const { tagName } = originParent
  return {
    parentTagName: tagName,
    parentIndex: index,
    textOffset: preNodeOffset + offset,
  }
}

export function serialize(
  startNode: Text,
  startOffset: number,
  endNode: Text,
  endOffset: number,
  ancestorNode: Node,
  root: HTMLElement = document.body,
) {
  const startMeta = getDomMeta(startNode, startOffset, root)
  const endMeta = getDomMeta(endNode, endOffset, root)
  const ancestorElement =
    ancestorNode.nodeType === 3
      ? getOriginParent(ancestorNode as Text)
      : (ancestorNode as HTMLElement)
  if (!ancestorElement) {
    return null
  }
  const index = countGlobalNodeIndex(ancestorElement, root)
  return {
    startMeta,
    endMeta,
    ancestorMeta: {
      parentTagName: ancestorElement.tagName,
      parentIndex: index,
    },
  }
}

const queryElementNode = (meta: any, root: HTMLElement) => {
  return root.getElementsByTagName(meta.parentTagName)[meta.parentIndex]
}

function getTextChildByOffset(parent: HTMLElement, offset: number) {
  const nodeStack: [Node] = [parent]
  let curNode = null
  let curOffset = 0
  let startOffset = 0
  while ((curNode = nodeStack.pop())) {
    const children = curNode.childNodes
    for (let i = children.length - 1; i >= 0; i--) {
      nodeStack.push(children[i])
    }
    if (curNode.nodeType === 3) {
      startOffset = offset - curOffset
      curOffset += curNode.textContent!.length
      if (curOffset >= offset) {
        break
      }
    }
  }
  if (!curNode) {
    curNode = parent
  }
  return { node: curNode, offset: startOffset }
}

export function deSerialize(meta: any, root: HTMLElement = document.body) {
  const { startMeta, endMeta, ancestorMeta } = meta
  const startElement = queryElementNode(startMeta, root)

  const endElement = queryElementNode(endMeta, root)
  const startNode = getTextChildByOffset(startElement, startMeta.textOffset)
  const endNode = getTextChildByOffset(endElement, endMeta.textOffset)

  return {
    startNode: startNode.node,
    startOffset: startNode.offset,
    endNode: endNode.node,
    endOffset: endNode.offset,
    ancestorNode: queryElementNode(ancestorMeta, root),
  }
}
