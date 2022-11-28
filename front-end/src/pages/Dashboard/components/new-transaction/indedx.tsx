export function NewTransaction() {

    return (
        <div className="new-transaction">
            <h1>New Transaction</h1>

            <form>
                <input type="text" placeholder="Received" />
                <input type="number" placeholder="Balance" />
                <input type="text" placeholder="Details" />
            </form>
        </div>
    );

}