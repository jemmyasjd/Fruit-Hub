import React from 'react'
import Testimonial from '../Componets/Testimonial';

const AboutPage = () => {
    return (
        <>
            <div class="container-fluid bg-dark">
                <div
                    class="container text-center align-content-center About-part pt-5"
                    style={{ height: "35vh" }}
                >
                    <p style={{ color: "orange" }}>WE SALE FRESH FRUITS</p>
                    <h2  >About</h2>
                </div>
            </div>
            <div class="container mt-5 d-flex">
                <div class="row">
                    <div
                        class="col-lg-6 col-md-6 mb-4 mb-md-5 align-content-center justify-content-center"
                    >
                        <div class="list-box d-flex">
                            <div class="list-icon p-4">
                                <i class="fas fa-shipping-fast"></i>
                            </div>
                            <div class="content">
                                <h3>Home Delivery</h3>
                                <p>
                                Enjoy the convenience of fresh fruits delivered right to your doorstep, ensuring you always have healthy options on hand.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 mb-5 mb-md-5">
                        <div class="list-box d-flex">
                            <div class="list-icon p-4">
                                <i class="fas fa-money-bill-alt"></i>
                            </div>
                            <div class="content">
                                <h3>Best Price</h3>
                                <p>
                                    We offer top-quality fruits at prices that won't break the bank, making healthy eating affordable for everyone.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 mb-5 mb-md-5">
                        <div class="list-box d-flex">
                            <div class="list-icon p-4">
                                <i class="fas fa-briefcase"></i>
                            </div>
                            <div class="content">
                                <h3>Custom Box</h3>
                                <p>
                                    Create your own custom fruit box, tailored to your preferences, and enjoy a personalized selection of fresh fruits.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="list-box d-flex">
                            <div class="list-icon p-4">
                                <i class="fas fa-sync-alt"></i>
                            </div>
                            <div class="content">
                                <h3>Quick Refund</h3>
                                <p>
                                    If you're not satisfied with your purchase, we offer a hassle-free quick refund process to ensure your peace of mind.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Testimonial />
        </>
    )
}
export default AboutPage;
