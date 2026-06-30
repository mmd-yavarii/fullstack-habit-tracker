// components/AppBackground.jsx

export default function AppBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <div
                className="absolute inset-0
                            bg-gradient-to-br
                            from-slate-950
                            via-slate-900
                            to-slate-950"
            />

            <div
                className="absolute top-10 left-10
                            h-72 w-72
                            rounded-full
                            bg-blue-500/20
                            blur-3xl"
            />

            <div
                className="absolute bottom-10 right-10
                            h-72 w-72
                            rounded-full
                            bg-purple-500/20
                            blur-3xl"
            />
        </div>
    );
}
