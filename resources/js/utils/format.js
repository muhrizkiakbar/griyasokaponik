// resources/js/utils/format.js
import dayjs from 'dayjs';

export function formatNumber(value) {
    return new Intl.NumberFormat('id-ID').format(value);
}

export function formatDate(date) {
    if (!date) return '';
    return dayjs(date).format('DD/MM/YYYY');
}
