import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 100 }, // Нагрев
        { duration: '1m', target: 500 },  // Пиковая нагрузка
        { duration: '30s', target: 0 },   // Охлаждение
    ],
};

export default function () {
    http.get('http://localhost:5173/');
    sleep(1); // Задержка между запросами
}