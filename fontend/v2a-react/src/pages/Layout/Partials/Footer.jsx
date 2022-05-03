import React from 'react';
import FooterContent from '../../../components/FooterContent';

export default function Footer(props) {
  return (
    <>
		<FooterContent />
		<div className="footer-bottom-area">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-md-8">
						<div className="copyright">
							<p>&copy; 2022 V2A - AVNENDV. <a href="https://github.com/a2xvodoi" target="_blank" rel='noreferrer'>a2xvodoi</a></p>
						</div>
					</div>
					
					<div className="col-md-4">
						<div className="footer-card-icon">
							<i className="ms-2 fa fa-cc-discover"></i>
							<i className="ms-2 fa fa-cc-mastercard"></i>
							<i className="ms-2 fa fa-cc-paypal"></i>
							<i className="ms-2 fa fa-cc-visa"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
  );
}
