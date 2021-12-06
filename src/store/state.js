export default {
    baseUrl: 'http://backend.com/api/admin/',
    loader: false,
    page_title: '',
    show_resend_code_button: false,
    uploadBaseUrl: 'http://backend.com/api/upload/image',
    videoUploadBaseUrl: 'http://backend.com/api/admin/videos/upload',
    videoUploadProgress:0,
    backendUrl:'http://backend.com/api/',
    zipUploadProgress:0,
    uploadedZip:null,
    uploadedVideo: null,
    permissions: [],
    uploadedImages: {},
    user_info: [],
    uuid: null,
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