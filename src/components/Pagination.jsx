const Pagination = (props) => {
    const pageCount = Math.ceil(props.length / props.itemszPerPage)
    const pages = []

    for (let i = 1; i <= pageCount; i++){
        pages.push(i)
    }
    return ( 
        <div>
            <ul className="pagination pagination-sm justify-content-center">
                <li className={"page-item" + (props.currentPage === 1 ? " disabled" : null)}>
                    <button className="page-link" onClick={() => null}>&laquo;</button>
                </li>

                { pages.map(page => (
                    <li key={page} className={"page-item" + (props.currentPage === page ? " active" :null)}>
                        <button className="page-link" onClick={() => null}>{page}</button>
                    </li>
                )) }

                <li className={"page-item" + (props.currentPage === pageCount ? " disabled" : null)}>
                    <button className="page-link" onClick={() => null}>&raquo;</button>
                </li>
            </ul>
        </div>
     );
}
 
export default Pagination;