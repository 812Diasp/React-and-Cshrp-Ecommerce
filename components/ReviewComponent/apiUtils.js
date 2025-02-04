// apiUtils.js
import axios from 'axios';

const makeApiRequest = async ({
                                  url,
                                  method = 'GET',
                                  data = null,
                                  headers = {},
                                  withCredentials = true,
                                  csrfUrl = null,
                              }) => {
    try {
        // Получаем CSRF токен, если csrfUrl передан
        let csrfToken = null;
        if (csrfUrl) {
            const csrfResponse = await axios.get(csrfUrl, { withCredentials: withCredentials });
            csrfToken = csrfResponse.data.token;
        }

        // Подготавливаем заголовки
        const requestHeaders = { ...headers };
        if(csrfToken)
        {
            requestHeaders['X-CSRF-Token'] = csrfToken;
        }
        if(withCredentials)
        {
            requestHeaders['Content-Type'] = 'application/json';
        }

        // Отправляем запрос
        const response = await axios({
            method: "POST",
            url: url,
            data:{
                "title": data.title,
                "pros": data.pros,
                "cons": data.cons,
                "comment": data.comment,
                "rating": data.rating,
                },
            headers: requestHeaders,
            withCredentials: withCredentials,
        });

        // Обработка успешного ответа
        if (response.status === 200 || response.status === 201) {
            console.log('Запрос успешно выполнен:', response.data);
            return response.data;
        } else {
            console.error('Ошибка при запросе:', response.status, response.data);
            throw new Error(`Ошибка при запросе: ${response.status} ${response.data}`);
        }
    } catch (error) {
        // Обработка ошибок
        if (error.response) {
            // Запрос был сделан и сервер ответил, но с ошибкой
            console.error('Ошибка ответа сервера:', error.response.status, error.response.data);
            throw new Error(`Ошибка ответа сервера: ${error.response.status} ${error.response.data}`);
        } else if (error.request) {
            // Запрос был сделан, но сервер не ответил
            console.error('Ошибка запроса:', error.request);
            throw new Error('Ошибка запроса: Сервер не отвечает');
        } else {
            // Ошибка настройки
            console.error('Ошибка:', error.message);
            throw new Error(`Ошибка: ${error.message}`);
        }
    }
};

export default makeApiRequest;