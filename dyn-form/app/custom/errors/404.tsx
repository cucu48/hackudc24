export default function NotFound({element}: any) {
    return (<div className="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Error:</strong> Not Found
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>);
}  