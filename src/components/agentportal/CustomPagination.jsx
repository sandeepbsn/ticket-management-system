export default function CustomPagination(length,activePage, rows_per_page){

    let total_pages = Math.ceil(length / rows_per_page)
    let low = (activePage - 1) * rows_per_page
    let high = activePage * rows_per_page
    
    return {
        "total_pages":total_pages,
        "low":low,
        "high":high,
    }
}