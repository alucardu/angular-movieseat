interface INotification {
  title: string,
  content: string,
  read: boolean,
}

export const notifications: INotification[] = [
  {
    title: 'Alucardu added Oppenheimer(2023) to their watchlist',
    content: 'Check out the move details here',
    read: false
  },
  {
    title: 'Alucardu reviewed Oppenheimer(2023)',
    content: 'Read the review here',
    read: false
  },
  {
    title: 'Oppenheimer(2023) has a new release date',
    content: 'Oppenheimer will be release in theater on 23 november 2023',
    read: false
  }
]
