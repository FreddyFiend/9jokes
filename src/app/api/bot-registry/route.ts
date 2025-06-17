import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export async function POST(request: Request) {
  const body = await request.json();

  const createdPost = await prisma.botRegistration.create({
    data: {
      text: body.text,
      license_key: body.license_key,
      machine_id: body.machine_id,
      activation_date: body.activation_date,
      expiration_date: body.expiration_date,
      event: body.event,
    },
  });

  return NextResponse.json({ status: "Successful" });
}
