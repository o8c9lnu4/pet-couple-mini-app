# 🚀 Развертывание API сервера

## Проблема
Mini App на GitHub Pages не может подключиться к API серверу на localhost. Нужно развернуть API в интернете.

## Решения

### 1. 🆓 Бесплатные варианты

#### **Railway (рекомендуется)**
1. Зайдите на [railway.app](https://railway.app)
2. Зарегистрируйтесь через GitHub
3. Нажмите "New Project" → "Deploy from GitHub repo"
4. Выберите ваш репозиторий
5. Railway автоматически определит Python проект
6. Получите URL вида: `https://your-app.railway.app`

#### **Render**
1. Зайдите на [render.com](https://render.com)
2. Создайте аккаунт
3. "New" → "Web Service"
4. Подключите GitHub репозиторий
5. Настройки:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python mini_app/api_server.py`
6. Получите URL

#### **Heroku (бесплатный план закрыт)**
1. Создайте аккаунт на Heroku
2. Установите Heroku CLI
3. Создайте `Procfile`:
   ```
   web: python mini_app/api_server.py
   ```
4. Разверните через CLI

### 2. 🔧 Настройка для развертывания

#### **Создайте requirements.txt в корне проекта:**
```
python-telegram-bot==20.7
```

#### **Обновите api_server.py для работы на хостинге:**
```python
# В конце файла api_server.py добавьте:
if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 8000))
    run_api_server(port)
```

#### **Создайте Procfile (для Heroku):**
```
web: python mini_app/api_server.py
```

### 3. 🔄 Обновление Mini App

После получения URL API:

1. **Обновите app.js:**
```javascript
const apiUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000' 
    : 'https://your-api-url.railway.app';
```

2. **Загрузите обновленный файл на GitHub**

### 4. 🧪 Тестирование

1. **Локально:** `http://localhost:8000/api/user?user_id=123`
2. **В интернете:** `https://your-api-url.railway.app/api/user?user_id=123`

### 5. 🔒 Безопасность

Для продакшена добавьте:
- Аутентификацию
- Rate limiting
- HTTPS
- Валидацию данных

## Быстрое решение

Если хотите быстро протестировать:

1. **Используйте Railway** (самый простой)
2. **Скопируйте файлы** из папки mini_app в корень репозитория
3. **Создайте requirements.txt** с зависимостями
4. **Разверните** и получите URL
5. **Обновите** Mini App с новым URL

## Альтернатива - Демо-режим

Если не хотите развертывать API:
- Mini App уже работает в демо-режиме
- Данные сохраняются в localStorage
- Все функции работают локально 