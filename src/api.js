/*
Copyright Igor Khorev igorhorev@gmail.com
*/

import axios from 'axios'

const HTTP = axios.create({
  baseURL: '/api/'
})

const isMobileDevice = function () {
  return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1)
}

export {HTTP, isMobileDevice}
