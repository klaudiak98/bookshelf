import { Button as BootstrapButton} from 'react-bootstrap';

 const Button = ({text, type, disabled, onClick, style, className}) => {

  return (
    <BootstrapButton 
      className={"btn " + className}
      type={type} 
      onClick={onClick} 
      style={style} 
      disabled={disabled}
    >
      {text}
    </BootstrapButton>
  )
}

Button.defaultProps = {
    type: 'button',
    text: 'Click'
}

export default Button;