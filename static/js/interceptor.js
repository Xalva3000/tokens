import axios from 'axios';

// Создаем экземпляр axios
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
});

// Функция для получения access token из хранилища (например, localStorage)
const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Функция для получения refresh token из хранилища
const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

// Функция для обновления access token
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await axios.post('https://api.example.com/refresh-token', {
    refreshToken,
  });

  const { accessToken } = response.data;
  localStorage.setItem('accessToken', accessToken);
  return accessToken;
};

// Добавляем интерсептор для запросов
apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Добавляем интерсептор для ответов
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Проверяем, истек ли access token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Устанавливаем флаг, чтобы избежать бесконечного цикла

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest); // Повторяем оригинальный запрос с новым access token
      } catch (refreshError) {
        // Обработка ошибки обновления токена (например, перенаправление на страницу входа)
        console.error('Unable to refresh access token', refreshError);
        // Здесь можно добавить логику для перенаправления пользователя на страницу входа
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;