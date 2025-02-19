export default function Request()
{

    return (
        <div>
            U will never see this...
        </div>
    )
}

export function getServerSideProps()
{
    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
}