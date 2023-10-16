import { DeepReadonly } from '@/typings/helpers'
import { genUniqueKey } from '../utils/helpers'
import { getAllDicts } from './dicts'

export type MtaAutoUnfold = '' | 'once' | 'always' | 'popup' | 'hide'

export type ProfileMutable = ReturnType<typeof _getDefaultProfile>
export type Profile = DeepReadonly<ProfileMutable>

export interface ProfileID {
  id: string
  name: string
}

export type ProfileIDList = Array<ProfileID>

export const getDefaultProfile: (id?: string) => Profile = _getDefaultProfile

export default getDefaultProfile

export function _getDefaultProfile(id?: string) {
  return {
    version: 1,

    id: id || genUniqueKey(),

    /** auto unfold multiline textarea search box */
    mtaAutoUnfold: '' as MtaAutoUnfold,

    /** show waveform control panel */
    waveform: true,

    /** remember user manual dict folding on the same page */
    stickyFold: false,

    dicts: {
      /** default selected dictionaries */
      selected: ['bing', 'cobuild', 'cambridge', 'youdao', 'urban', 'vocabulary', 'caiyun', 'youdaotrans', 'zdic', 'guoyu', 'liangan', 'googledict'] as Array<
        keyof ReturnType<typeof getAllDicts>
      >,
      // settings of each dict will be auto-generated
      all: getAllDicts(),
    },
  }
}

export function getDefaultProfileID(id?: string): ProfileID {
  return {
    id: id || genUniqueKey(),
    name: '%%_default_%%',
  }
}

export interface ProfileStorage {
  idItem: ProfileID
  profile: Profile
}
