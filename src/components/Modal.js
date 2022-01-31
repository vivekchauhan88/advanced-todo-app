const Modal = ({ show, onClose, onSubmit, title, children }) => {
	if (!show) {
		return null;
	}
	return (
		<div className='modal'>
			<div className='modal-content'>
				<div className='modal-header'>
					<h4 className='modal-title'>{title}</h4>
				</div>
				<div className='modal-body'>{children}</div>
				<div className='modal-footer'>
					<button className='addPadding' onClick={onSubmit}>
						Submit
					</button>
					&nbsp;
					<button className='addPadding' onClick={onClose}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
