export interface ITextFieldProps{
    type?: string,
    label: string, 
    className?: string,
    placeholder: string, 
    errorMessage?: string,
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>,
    onChange?: () => void
}

export interface IButtonProps {
    type?: 'button' | 'submit',
    textContent: string,
    className?: string,
    Icon?: React.FC<React.SVGProps<SVGSVGElement>> | string,
    onClick?: () => void
}