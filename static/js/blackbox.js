async function getToken(username, password) {
    const url = 'http://localhost:8000/login'; // Убедитесь, что URL соответствует вашему API

    const credentials = {
        username: username,
        password: password
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.access_token; // Возвращаем токен
    } catch (error) {
        console.error('Error fetching token:', error);
        return null; // Возвращаем null в случае ошибки
    }
}

// Пример использования функции
getToken('test', 'test').then(token => {
    if (token) {
        console.log('Access Token:', token);
    } else {
        console.log('Failed to retrieve token');
    }
});

getToken();