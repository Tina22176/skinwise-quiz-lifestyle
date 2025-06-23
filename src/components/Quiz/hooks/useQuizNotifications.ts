
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export const useQuizNotifications = () => {
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const { toast } = useToast();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully');
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        toast({
          title: "Notifications activées ! 🔔",
          description: "Tu recevras des rappels pour refaire ton quiz",
        });
        
        // Programmer un rappel dans 30 jours
        scheduleQuizReminder();
      }
    }
  };

  const scheduleQuizReminder = () => {
    // Utiliser setTimeout pour une notification locale (demo)
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    
    setTimeout(() => {
      if (notificationPermission === 'grante') {
        new Notification('Quiz Peau - Rappel', {
          body: 'Il est temps de refaire ton quiz peau ! 🌸',
          icon: '/favicon.ico',
          tag: 'quiz-reminder'
        });
      }
    }, thirtyDays);
  };

  const sendTestNotification = () => {
    if (notificationPermission === 'granted') {
      new Notification('Test - Quiz Peau', {
        body: 'Notification de test ! Ton quiz t\'attend 💕',
        icon: '/favicon.ico'
      });
    }
  };

  return {
    notificationPermission,
    requestNotificationPermission,
    sendTestNotification
  };
};
