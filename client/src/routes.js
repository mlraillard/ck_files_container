import { SERVER_HOST, SERVER_PORT, FILES_DIRECTORY} from './constants'

export const DIRECTORIES_NAMES = `${SERVER_HOST}\:${SERVER_PORT}\/ckdirs`
export const DIRECTORY_FILES_INFO = `${SERVER_HOST}\:${SERVER_PORT}\/ckdirfiles?dir=`
export const DIRECTORY_FILE = `${SERVER_HOST}\:${SERVER_PORT}\/ckdirfile?dir=`
//
// export const UPLOAD = `${SERVER_HOST}\:${UPLOAD_SERVER_PORT}\/upload`
export const UPLOAD = `${SERVER_HOST}\:${SERVER_PORT}\/upload`
