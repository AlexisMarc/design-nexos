export interface itemsProgressBar {
    status: 'success' | 'select' | 'select-success' | 'pending' | 'loading',
      title: string,
      description?: string,
      disabled: boolean,
      show: boolean
}