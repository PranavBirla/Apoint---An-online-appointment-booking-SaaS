export default function Badge({ status }) {
    const styles = {
        pending:
            "bg-yellow-50 text-yellow-700",

        confirmed:
            "bg-blue-50 text-blue-700",

        completed:
            "bg-green-50 text-green-700",

        cancelled:
            "bg-red-50 text-red-700",
    };

    return (
        <span
            className={`
          px-3
          py-1
          rounded-full
          text-xs
          font-medium
          ${styles[status]}
        `}
        >
            {status}
        </span>
    );
}