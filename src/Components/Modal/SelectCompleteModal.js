import React from "react";
import '../Modal/Modal.css'

const SelectCompleteModal = (props) => {

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
                            선정 결과 보기
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    )
}

export default SelectCompleteModal;