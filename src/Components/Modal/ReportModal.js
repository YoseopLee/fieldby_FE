import React from "react";
import '../Modal/Modal.css'

const ReportModal = (props) => {

    const {open, result} = props

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                        <button className="result" onClick={result}>
                            돌아가기
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    )
}

export default ReportModal;