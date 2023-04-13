import { notification } from 'antd';

export type NoticeType = 'success' | 'error' | 'warning' | 'config' | 'destroy';

export function Noti(type: NoticeType, message: string, desc: string) {
  notification[type]({
    message: message,
    description: desc,
    placement: 'top',
    duration: 3,
  });
}
