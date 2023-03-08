import { Button as BootstrapButton} from 'react-bootstrap';

 const Button = ({text, type, onClick}) => {

  return (
    <BootstrapButton className="btn" type={type} onClick={onClick}>{text}</BootstrapButton>
  )
}

Button.defaultProps = {
    type: 'button',
    text: 'Click'
}

export default Button