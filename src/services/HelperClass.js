class HelperClass {

    // show errors in catch
    showErrors(error, noty) {

        let statusCode = error.response.status;

        if (statusCode === 422) {
            let messages = error.response.data.errors;
            for (let i in messages) {

                let message = messages['' + i][0]

                noty.error(message, {
                    timeout: 3000,
                    layout: 'topRight'
                })
            }
        } else {
            let errors = {
                '401': 'شما احراز هویت نشدید',
                '500': 'خطای سمت سرور',
                '403': 'شما مجوز مورد نظر را ندارید',
                '503': 'سرور در حال به روز رسانی است',
                '404': 'مسیر درخواست مورد نظر یافت نشد',
            }
            noty.error(errors['' + statusCode], {
                killer: true,
                timeout: 3000,
                layout: 'topRight'
            })
        }

    }

}

export default new HelperClass();