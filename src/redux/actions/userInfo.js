export const GET_USER_INFO_REQUEST = 'userInfo/GET_USER_INFO_REQUEST'
export const GET_USER_INFO_SUCCESS = 'userInfo/GET_USER_INFO_SUCCESS'
export const GET_USER_INFO_FAIL = 'userInfo/GET_USER_INFO_FAIL'

import type from '../../services/request'

function getUserInfoRequest () {
    return {
        type: GET_USER_INFO_REQUEST
    }
}

function getUserInfoSuccess (userInfo) {
    return {
        type: GET_USER_INFO_SUCCESS,
        userInfo: userInfo
    }
}

function getUserInfoFail () {
    return {
        type: GET_USER_INFO_FAIL
    }
}

export function getUserInfo() {
    const { get } = type
    return function(dispatch) {
        dispatch(getUserInfoRequest())
        return get('http://127.0.0.1:8888/api/user.json')
            .then(res => {
                console.log(res)
                dispatch(getUserInfoSuccess(res))
            })
            .catch(err => {
                console.log(err)
                dispatch(getUserInfoFail())
            })
    }
    // get.get('http://127.0.0.1:8888/api/user.json','').then(res => {
    //     console.log(res)
    // })
    // // get('http://127.0.0.1:8888/api/user.json','').then(res => {
    // //     console.log(res)
    // // })
    // return function (dispatch) {
        
    // }
}