// import { SupportedLangs } from '@/_helpers/lang-check'

// import bing from '@/components/dictionaries/bing/config'

export type BingConfig = DictItem<{
  tense: boolean
  phsym: boolean
  cdef: boolean
  related: boolean
  sentence: number
}>

export default function bing(): BingConfig {
  return {
    lang: '11000000',
    selectionLang: {
      english: true,
      chinese: true,
      japanese: false,
      korean: false,
      french: false,
      spanish: false,
      deutsch: false,
      others: false,
      matchAll: false,
    },
    defaultUnfold: {
      english: true,
      chinese: true,
      japanese: true,
      korean: true,
      french: true,
      spanish: true,
      deutsch: true,
      others: true,
      matchAll: false,
    },
    preferredHeight: 240,
    selectionWC: {
      min: 1,
      max: 5,
    },
    options: {
      tense: true,
      phsym: true,
      cdef: true,
      related: true,
      sentence: 4,
    },
  }
}

const languages = ['chinese', 'english', 'japanese', 'korean', 'french', 'spanish', 'deutsch'] as const

type Languages = (typeof languages)[number]

export type SupportedLangs = {
  [key in Languages | 'others' | 'matchAll']: boolean
}

// For TypeScript to generate typings
// Follow alphabetical order for easy reading
export const defaultAllDicts = {
  bing: bing(),
}

export type AllDicts = typeof defaultAllDicts

export const getAllDicts = (): AllDicts => JSON.parse(JSON.stringify(defaultAllDicts))

interface DictItemBase {
  /**
   * Supported language: en, zh-CN, zh-TW, ja, kor, fr, de, es
   * `1` for supported
   */
  lang: string
  /** Show this dictionary when selection contains words in the chosen languages. */
  selectionLang: SupportedLangs
  /**
   * If set to true, the dict start searching automatically.
   * Otherwise it'll only start seaching when user clicks the unfold button.
   * Default MUST be true and let user decide.
   */
  defaultUnfold: SupportedLangs
  /**
   * This is the default height when the dict first renders the result.
   * If the content height is greater than the preferred height,
   * the preferred height is used and a mask with a view-more button is shown.
   * Otherwise the content height is used.
   */
  selectionWC: {
    min: number
    max: number
  }
  /** Word count to start searching */
  preferredHeight: number
}

/**
 * Optional dict custom options. Can only be boolean, number or string.
 * For string, add additional `options_sel` field to list out choices.
 */
type DictItemWithOptions<Options extends { [option: string]: number | boolean | string } | undefined = undefined> = Options extends undefined
  ? DictItemBase
  : DictItemBase & { options: Options }

/** Infer selectable options type */
export type SelectOptions<
  Options extends { [option: string]: number | boolean | string } | undefined = undefined,
  Key extends keyof Options = Options extends undefined ? never : keyof Options
> = {
  [opt in Key extends any ? (Options[Key] extends string ? Key : never) : never]: Options[opt][]
}

/**
 * If an option is of `string` type there will be an array
 * of options in `options_sel` field.
 */
export type DictItem<
  Options extends { [option: string]: number | boolean | string } | undefined = undefined,
  Key extends keyof Options = Options extends undefined ? never : keyof Options
> = Options extends undefined
  ? DictItemWithOptions
  : DictItemWithOptions<Options> &
      ((Key extends any ? (Options[Key] extends string ? Key : never) : never) extends never
        ? {}
        : {
            options_sel: SelectOptions<Options, Key>
          })
