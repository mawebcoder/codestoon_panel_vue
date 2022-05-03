export default {
    baseUrl: 'http://codestoon.com/api/admin/',
    loader: false,
    page_title: '',
    show_resend_code_button: false,
    uploadBaseUrl: 'http://codestoon.com/api/upload/image',
    videoUploadBaseUrl: 'http://codestoon.com/api/admin/videos/upload',
    videoUploadProgress:0,
    backendUrl:'http://codestoon.com/api/',
    zipUploadProgress:0,
    uploadedZip:null,
    uploadedVideo: null,
    permissions: [],
    uploadedImages: {},
    user_info: [],
    uuid: null,
    show_restore_confirmation_dialog:false,
    show_confirmation_dialog: false,
    user_role: [],
    image_file: {},
    profileImage: null,
    pages: [

        {persian: 'چارت ها', english: 'charts'},
        {persian: 'آمار و اعلانات', english: 'reports'},
        {persian: 'ایجاد نقش جدید', english: 'create new role'},

    ]

}