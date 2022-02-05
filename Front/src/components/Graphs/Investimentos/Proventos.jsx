import React, { useState } from "react";

export default props => {
    const [componente, setComponente] = useState(<div className='container-charts3 skeleton'>Em Manutencao</div>);

    return componente
};