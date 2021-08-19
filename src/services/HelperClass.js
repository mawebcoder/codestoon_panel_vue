import store from "../store/store";
import Chart from 'chart.js'

class HelperClass {

    // show errors in catch
    showErrors(error, noty) {
        store.state.loader = false;
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

    showSuccess(noty) {
        store.state.loader = false;
        noty.success('عملیات با موفقیت انجام شد')
        this.scrollTop();
    }

    scrollTop() {
        let scrollTop = scrollY;

        let scrollTopSetInterval = setInterval(function () {

            scrollTop -= 20;

            if (scrollTop <= 0) {
                clearInterval(scrollTopSetInterval);
                return;
            }
            document.body.scrollTop = scrollTop - 20;
            document.documentElement.scrollTop = scrollTop - 20;

        }, 20)
    }


    loadChart(canvas_id, options) {

        const ctx = document.getElementById(canvas_id);

        new Chart(ctx, options);

    }

    numericInputValidation(e) {
        let input=e.target;

        if (e.keyCode!==46 && e.keyCode!==8){

            if(input.value.length===1){
                if (parseInt(input.value)===0){
                    e.preventDefault();
                    return;
                }
            }
        }


        let invalid_keys = [187, 69, 189];

        invalid_keys.includes(e.keyCode) ?
            e.preventDefault() : '';
    }

    discountValidationValue(e){
        let input=e.target;
        if (parseInt(input.value)>100){
            input.value=99
        }
    }


}

export default new HelperClass();