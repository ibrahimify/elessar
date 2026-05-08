export default function DataTable({ children, className = '' }) {
  return (
    <div className={`data-table-wrap ${className}`}>
      {children}
    </div>
  )
}
