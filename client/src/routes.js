import { SERVER_HOST, SERVER_PORT, FILES_DIRECTORY} from './constants'

export const SINGLE_DIRECTORY_FILES_INFO = `${SERVER_HOST}\:${SERVER_PORT}\/${FILES_DIRECTORY}`
export const SINGLE_DIRECTORY_FILE = `${SERVER_HOST}\:${SERVER_PORT}\/ckfile?filename=`
//
export const DIRECTORIES_NAMES = `${SERVER_HOST}\:${SERVER_PORT}\/ckdirs`
export const DIRECTORY_FILES_INFO = `${SERVER_HOST}\:${SERVER_PORT}\/ckdirfiles?dir=`
export const DIRECTORY_FILE = `${SERVER_HOST}\:${SERVER_PORT}\/ckdirfile?dir=`