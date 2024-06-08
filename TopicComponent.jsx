import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export default function TopicComponent({ title, jobDesc, tags }) {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <textarea>{jobDesc}</textarea>
                </CardContent>
                <CardFooter>
                    {tags && tags.map(
                        (info, index) => {
                            return (
                                <Badge key={index} variant="outline">{info}</Badge>
                            )
                        }
                    )}
                    <Button variant="outline">Start Interview</Button>
                </CardFooter>
            </Card>
        </>
    )
}
