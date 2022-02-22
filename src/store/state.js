export default {
    baseUrl: 'http://localhost/api/admin/',
    loader: false,
    page_title: '',
    show_resend_code_button: false,
    uploadBaseUrl: 'http://localhost/api/upload/image',
    videoUploadBaseUrl: 'http://localhost/api/admin/videos/upload',
    videoUploadProgress:0,
    backendUrl:'http://localhost/api/',
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