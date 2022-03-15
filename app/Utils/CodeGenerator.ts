export default function CodeGenerator(prefix: string) {
  const date = `${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`

  const code = date
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{2})$/, '$1$2$3-$4$5$6')

  switch (prefix) {
    case 'order':
      return `GT-${code}`

    case 'client':
      return `CT-CL-${code}`
    case 'employee':
      return `GT-CO-${code}`
    case 'payment':
      return `GT-PA-${code}-P`
    default:
      return `GT-${code}`
  }
}
