import { Button as BootstrapButton} from 'react-bootstrap';

 const Button = ({text, type, disabled, onClick, style}) => {

  return (
    <BootstrapButton 
      className="btn" 
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