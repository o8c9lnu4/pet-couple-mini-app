// 🎉 Скрипт приветствия для Telegram Mini App
// Персонализированные приветствия и подсказки для пользователей

class WelcomeScript {
    constructor() {
        this.welcomeMessages = {
            morning: [
                "🌅 Доброе утро! Готовы позаботиться о вашем питомце?",
                "☀️ Доброе утро! Ваш питомец уже ждет завтрака!",
                "🌞 Доброе утро! Время для утренней прогулки с питомцем!"
            ],
            afternoon: [
                "🌤️ Добрый день! Как дела у вашего питомца?",
                "☀️ Добрый день! Не забудьте поиграть с питомцем!",
                "🌤️ Добрый день! Ваш питомец скучает по вам!"
            ],
            evening: [
                "🌆 Добрый вечер! Время для вечернего ухода за питомцем!",
                "🌅 Добрый вечер! Ваш питомец готов ко сну!",
                "🌆 Добрый вечер! Не забудьте погладить питомца перед сном!"
            ],
            night: [
                "🌙 Доброй ночи! Ваш питомец уже спит!",
                "🌙 Доброй ночи! Завтра снова будем заботиться о питомце!",
                "🌙 Доброй ночи! Сладких снов вам и вашему питомцу!"
            ]
        };
        
        this.tips = [
            "💡 Совет: Регулярно кормите питомца для поддержания здоровья!",
            "💡 Совет: Играйте с питомцем для повышения счастья!",
            "💡 Совет: Давайте питомцу отдыхать для восстановления энергии!",
            "💡 Совет: Гладьте питомца для укрепления связи!",
            "💡 Совет: Следите за уровнем питомца - он растет с каждым действием!",
            "💡 Совет: Создайте пару с партнером для совместного ухода!",
            "💡 Совет: Проверяйте статистику для отслеживания прогресса!"
        ];
        
        this.encouragements = [
            "🌟 Вы отличный хозяин!",
            "🌟 Ваш питомец очень счастлив!",
            "🌟 Продолжайте в том же духе!",
            "🌟 Вы делаете все правильно!",
            "🌟 Ваш питомец вас любит!"
        ];
    }
    
    // Получение времени суток
    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 23) return 'evening';
        return 'night';
    }
    
    // Получение случайного сообщения
    getRandomMessage(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Основное приветствие
    getWelcomeMessage(user) {
        const timeOfDay = this.getTimeOfDay();
        const timeMessage = this.getRandomMessage(this.welcomeMessages[timeOfDay]);
        
        let welcomeText = `${timeMessage}\n\n`;
        
        if (user.first_name) {
            welcomeText += `Привет, ${user.first_name}! 👋\n\n`;
        }
        
        // Добавляем информацию о статусе
        if (user.hasCouple) {
            welcomeText += "💕 У вас есть пара - это здорово!\n";
        } else {
            welcomeText += "💕 Создайте пару с партнером для совместного ухода!\n";
        }
        
        // Добавляем совет дня
        welcomeText += `\n${this.getRandomMessage(this.tips)}`;
        
        return welcomeText;
    }
    
    // Приветствие для новых пользователей
    getNewUserWelcome(user) {
        return `🎉 Добро пожаловать в мир питомцев!\n\n` +
               `Привет, ${user.first_name || 'друг'}! 👋\n\n` +
               `🐾 Здесь вы можете:\n` +
               `• Создать пару с партнером\n` +
               `• Завести общего питомца\n` +
               `• Ухаживать за питомцем вместе\n` +
               `• Отслеживать прогресс и статистику\n\n` +
               `${this.getRandomMessage(this.tips)}`;
    }
    
    // Приветствие при возвращении
    getReturnWelcome(user, pet) {
        const timeOfDay = this.getTimeOfDay();
        const timeMessage = this.getRandomMessage(this.welcomeMessages[timeOfDay]);
        
        let welcomeText = `${timeMessage}\n\n`;
        welcomeText += `С возвращением, ${user.first_name || 'друг'}! 👋\n\n`;
        
        if (pet) {
            const petEmoji = this.getPetEmoji(pet.type);
            welcomeText += `${petEmoji} ${pet.name} очень рад вас видеть!\n`;
            
            // Анализируем состояние питомца
            if (pet.hunger < 30) {
                welcomeText += "🍽️ Питомец голоден - покормите его!\n";
            }
            if (pet.happiness < 50) {
                welcomeText += "🎾 Питомец грустит - поиграйте с ним!\n";
            }
            if (pet.energy < 30) {
                welcomeText += "😴 Питомец устал - дайте ему отдохнуть!\n";
            }
            
            welcomeText += `\n📊 Уровень: ${pet.level} | Опыт: ${pet.experience}/100\n`;
        }
        
        welcomeText += `\n${this.getRandomMessage(this.encouragements)}`;
        
        return welcomeText;
    }
    
    // Получение эмодзи питомца
    getPetEmoji(type) {
        const emojis = {
            cat: '🐱',
            dog: '🐕',
            rabbit: '🐰'
        };
        return emojis[type] || '🐾';
    }
    
    // Сообщение при создании пары
    getCoupleCreatedMessage(partnerId) {
        return `💕 Поздравляем! Пара создана!\n\n` +
               `🎉 Теперь вы можете:\n` +
               `• Создать общего питомца\n` +
               `• Ухаживать за ним вместе\n` +
               `• Делиться радостью с партнером\n\n` +
               `ID партнера: ${partnerId}\n` +
               `Поделитесь этим ID с партнером!`;
    }
    
    // Сообщение при создании питомца
    getPetCreatedMessage(pet) {
        const petEmoji = this.getPetEmoji(pet.type);
        return `🎉 Поздравляем! Питомец создан!\n\n` +
               `${petEmoji} Знакомьтесь с ${pet.name}!\n\n` +
               `🐾 Теперь вы можете:\n` +
               `• Кормить питомца\n` +
               `• Играть с ним\n` +
               `• Укладывать спать\n` +
               `• Гладить его\n\n` +
               `${this.getRandomMessage(this.encouragements)}`;
    }
    
    // Сообщение при выполнении действия
    getActionMessage(action, pet) {
        const actionEmoji = {
            feed: '🍽️',
            play: '🎾',
            sleep: '😴',
            pet: '🤗'
        };
        
        const actionNames = {
            feed: 'покормили',
            play: 'поиграли с',
            sleep: 'уложили спать',
            pet: 'погладили'
        };
        
        const emoji = actionEmoji[action] || '🐾';
        const name = actionNames[action] || 'позаботились о';
        
        return `${emoji} Вы ${name} ${pet.name}!\n\n` +
               `📊 Состояние питомца:\n` +
               `🍽️ Голод: ${pet.hunger}%\n` +
               `😊 Счастье: ${pet.happiness}%\n` +
               `⚡ Энергия: ${pet.energy}%\n\n` +
               `${this.getRandomMessage(this.encouragements)}`;
    }
    
    // Сообщение при повышении уровня
    getLevelUpMessage(pet) {
        const petEmoji = this.getPetEmoji(pet.type);
        return `🎉 Поздравляем! ${petEmoji} ${pet.name} достиг уровня ${pet.level}!\n\n` +
               `🌟 Ваш питомец растет и развивается!\n` +
               `📈 Продолжайте заботиться о нем!\n\n` +
               `${this.getRandomMessage(this.encouragements)}`;
    }
    
    // Ежедневное сообщение
    getDailyMessage(user, pet) {
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem('lastVisit');
        
        if (lastVisit === today) {
            return null; // Уже показывали сегодня
        }
        
        localStorage.setItem('lastVisit', today);
        
        const timeOfDay = this.getTimeOfDay();
        const timeMessage = this.getRandomMessage(this.welcomeMessages[timeOfDay]);
        
        let dailyText = `📅 Добро пожаловать в новый день!\n\n`;
        dailyText += `${timeMessage}\n\n`;
        
        if (pet) {
            dailyText += `${this.getPetEmoji(pet.type)} ${pet.name} соскучился по вам!\n`;
            dailyText += `📊 Уровень: ${pet.level} | Опыт: ${pet.experience}/100\n\n`;
        }
        
        dailyText += `${this.getRandomMessage(this.tips)}`;
        
        return dailyText;
    }
}

// Экспорт для использования в основном приложении
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WelcomeScript;
} 