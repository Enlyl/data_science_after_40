
export const notificationService = {
  async requestPermission() {
    if (!('Notification' in window)) {
      console.warn('Этот браузер не поддерживает уведомления.');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  },

  sendNotification(title: string, options?: NotificationOptions) {
    if (Notification.permission === 'granted') {
      try {
        // Пробуем отправить через Service Worker если он есть
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(title, {
              icon: '/icon.png', // Добавьте иконку если она есть
              badge: '/badge.png',
              ...options
            });
          });
        } else {
          // Иначе отправляем как обычное уведомление
          new Notification(title, options);
        }
      } catch (error) {
        console.error('Ошибка при отправке уведомления:', error);
      }
    }
  },

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker успешно зарегистрирован:', registration.scope);
      } catch (error) {
        console.error('Ошибка регистрации Service Worker:', error);
      }
    }
  }
};
