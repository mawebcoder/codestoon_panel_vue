export default {
    baseUrl: 'http://localhost:8000/api/admin/',
    loader: false,
    page_title: '',
    show_resend_code_button: false,
    uploadBaseUrl: 'http://localhost:8000/api/upload/image',
    videoUploadBaseUrl: 'http://localhost:8000/api/admin/videos/upload',
    videoUploadProgress:0,
    backendUrl:'http://localhost:8000/api/',
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