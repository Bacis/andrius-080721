interface ISize { xs: string, sm: string, lg: string }

const size: ISize = {
    xs: '320px',
    sm: '768px',
    lg: '1200px',
}

export const device = {
    xs: `min-width: ${size.xs}`,
    sm: `min-width: ${size.sm}`,
    lg: `min-width: ${size.lg}`
}
