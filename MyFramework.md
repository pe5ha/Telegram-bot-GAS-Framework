Версия 1.51

Мой фреймворк для моих ботов

Для актуальной разработки фреймворк можно включать в проект как сабмодуль, 
https://www.atlassian.com/git/tutorials/git-submodule
но.. Но как-то мне неудобно что-ли было, что он не слишком универсальный чтоли. и легче было файлы копировать.

TODO:
* например, что делать с TableStructures в которой описывается табличка юзерс во фреймворке? 
ведь от проекта к проекту у юзеров разные поля в таблице появляются. как сделать чтобы это было во фреймворке?    
* Логирование ошибок в таблицу в Debug. Надо ли?
* !! BotConfig в гугл таблице - настройки - вести ли логирование? Надо ли?

Когда доделаю фреймворк, скопирую его файлы (не сабмодулем) в репо https://github.com/pe5ha/GAS-Bot-Template


Что делаеть фреймворк:
- учёт юзеров
- логирование
- отправка и получение сообщений
- связь юзера с его данными из таблицы