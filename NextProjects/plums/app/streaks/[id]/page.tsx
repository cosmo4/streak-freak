import prisma from '@/lib/prisma';

export default async function ManageStreak({ params }: { params: { id: string } }) {
    const streak = await prisma.streak.findUnique({
                 where: {id: params.id},
             });
    console.log(streak);
    if (!streak) {
        return <div>404 - Not Found</div>
    }

    return (
        <div className="bg-purple-300 text-purple-800 p-8 rounded-lg w-1/3 mx-auto my-4">
            <h3 className="text-2xl">Manage Streak: {streak.name} </h3>
            <p>ID: {streak.id}</p>
            <p>Type: {streak.streakType} </p>
            <p>Total Count: {streak.totalCount}</p>
        </div>
    )
}

