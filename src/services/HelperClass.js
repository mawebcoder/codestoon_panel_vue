import store from "../store/store";
import Chart from 'chart.js'
import HttpVerbs from "./HttpVerbs";

class HelperClass {

    // show errors in catch
    showErrors(error, noty) {
        store.state.loader = false;
        store.state.show_confirmation_dialog = false;
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
                '405': 'نوع درخواست نامعتبر است',
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
        store.state.uuid = null;
        store.state.show_confirmation_dialog = false;
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
        let input = e.target;

        if (e.keyCode !== 46 && e.keyCode !== 8) {

            if (input.value.length === 1) {
                if (parseInt(input.value) === 0) {
                    e.preventDefault();
                    return;
                }
            }
        }


        let invalid_keys = [187, 69, 189];

        invalid_keys.includes(e.keyCode) ?
            e.preventDefault() : '';
    }

    discountValidationValue(e) {
        let input = e.target;
        if (parseInt(input.value) > 100) {
            input.value = 99
        }
    }

    renderTable(object, itemsArray, uri, search = null) {


        if (!itemsArray || !Array.isArray(itemsArray)) {
            alert('items are not array')
        }
        let url;
        let finalArray = [];
        if (search && search.length > 3) {
            url = uri + '?search=' + search
        } else if (search && search.length < 3) {
            return;
        } else {
            url = uri
        }


        HttpVerbs.getRequest(url)
            .then(res => {
                object.rows = [];
                if (res.status === 204) {
                    return;
                }

                this.last_page = res.data.data.last_page;

                let data = res.data.data.data;
                data.forEach((value, index) => {

                    if (typeof (finalArray[index]) === 'undefined') {
                        finalArray[index] = {};
                    }

                    itemsArray.forEach((value2) => {
                        finalArray[index][value2] = value[value2]
                        finalArray[index]['delete'] = `<span class="delete-table-button">حذف</span>`
                        finalArray[index]['edit'] = '<span class="edit-table-button">ویرایش</span>'
                        finalArray[index]['select'] = '<input class="checkbox-table" type="checkbox" value="' + value.id + '">'
                    })
                })
                object.rows = finalArray;
            }).catch(error => {
            this.showErrors(error, object.$noty)
        })
    }

    makeRandomString(length) {
        var result = [];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    }

}

export default new HelperClass();