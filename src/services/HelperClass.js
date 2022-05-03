import store from "../store/store";
import Chart from 'chart.js'

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
            console.log(error)
            noty.error(error.response.data.message)
        }


    }

    showSuccess(noty, scropToTop = true) {
        store.state.loader = false;
        store.state.uuid = null;
        store.state.show_confirmation_dialog = false;
        store.state.show_restore_confirmation_dialog = false;
        noty.success('عملیات با موفقیت انجام شد')
        if (scropToTop) {
            this.scrollTop();
        }
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

    renderTable(object, itemsArray, data, last_page, showEdit = true, showDelete = true, showSelect = true,showSeeMore=false) {

        if (!itemsArray || !Array.isArray(itemsArray)) {
            alert('items are not array')
        }

        let finalArray = [];

        object.rows = [];

        object.last_page = last_page

        data.forEach((value, index) => {

            if (typeof (finalArray[index]) === 'undefined') {
                finalArray[index] = {};
            }

            itemsArray.forEach((value2) => {
                finalArray[index][value2] = value[value2]!=null?value[value2]:`<span style="padding:10px;background:green;color:white;margin-top:8px;display:block;text-align:center;border-radius:5px">حذف شده یا وجود ندارد</span>`
                if (showDelete) {
                    finalArray[index]['delete'] = `<span class="delete-table-button">حذف</span>`
                }
                if (showEdit) {
                    finalArray[index]['edit'] = '<span class="edit-table-button">ویرایش</span>'
                }
                if (showSelect) {
                    finalArray[index]['select'] = '<input class="checkbox-table" type="checkbox" value="' + value.id + '">'
                }
                if (showSeeMore){
                    finalArray[index]['see'] = '<span >مشاهده بیشتر</span>'

                }

            })
        })
        object.rows = finalArray;
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