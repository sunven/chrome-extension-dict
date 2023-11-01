import { DeepReadonly } from '@/typings/helpers'
import { getAllDicts } from './dicts'
import { MtaAutoUnfold as _MtaAutoUnfold } from './profiles'

export type LangCode = 'zh-CN' | 'zh-TW' | 'en'

export type DictConfigsMutable = ReturnType<typeof getAllDicts>
export type DictConfigs = DeepReadonly<DictConfigsMutable>
export type DictID = keyof DictConfigsMutable
export type MtaAutoUnfold = _MtaAutoUnfold

export type TCDirection = 'CENTER' | 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT' | 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT'

export type InstantSearchKey = 'direct' | 'ctrl' | 'alt' | 'shift'

/** '' means no preload */
export type PreloadSource = '' | 'clipboard' | 'selection'

export type AllDicts = ReturnType<typeof getAllDicts>
