import { useState } from "react";

export function Transaction() {

    const [received, setReceived] = useState('');
    const [balance, setBalance] = useState('');
    const [details, setDetails] = useState('');

    function handleTransiction() {

    }

    return (
        <form onSubmit={handleTransiction}>

            <input
                type="text"
                placeholder="Received"
                value={received}
                onChange={event => setReceived(event.target.value)}
            />

            <input
                type="number"
                placeholder="Balance"
                value={balance}
                onChange={event => setBalance(event.target.value)}
            />

            <input
                type="text-area"
                placeholder="Details"
                value={details}
                onChange={event => setDetails(event.target.value)}
            />
        </form>
    );
}