import { SERVER_HOST, SERVER_PORT, FILES_DIRECTORY} from './constants'

export const DIRECTORIES_NAMES = `${SERVER_HOST}\:${SERVER_PORT}\/ckdirs`
export const DIRECTORIES_LABELS = `${SERVER_HOST}\:${SERVER_PORT}\/cklabels`
export const DIRECTORY_FILES_INFO = `${SERVER_HOST}\:${SERVER_PORT}\/ckdirfiles?dir=`
export const DIRECTORY_FILE = `${SERVER_HOST}\:${SERVER_PORT}\/ckdirfile?dir=`
//
// export const UPLOAD = `${SERVER_HOST}\:${UPLOAD_SERVER_PORT}\/upload`
export const UPLOAD = `${SERVER_HOST}\:${SERVER_PORT}\/upload`
export const DELETE = `${SERVER_HOST}\:${SERVER_PORT}\/ckdirfileRemove`
export const UPDATE_LABELS = `${SERVER_HOST}\:${SERVER_PORT}\/updateLabels`
