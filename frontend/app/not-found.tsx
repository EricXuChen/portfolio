import Image from "next/image";
import Link from "next/link";
import { Kicker, T } from "@/components/T";
import Scene from "@/components/Scene";
import { PAGE_SCENES } from "@/content/scenes";

export default function NotFound() {
  return (
    <section className="page-head wrap not-found has-scene">
      <Scene use={PAGE_SCENES.notFound.page} eager />
      <Image className="nf-watch" src="/objects/gold-pocket-watch.png" width={619} height={860} alt="" aria-hidden="true" sizes="260px" />
      <Kicker num="404" v={{ en: "Not in the archive", zh: "档案中没有这一页" }} />
      <h1 className="display">
        <T v={{ en: "This page has stopped.", zh: "这一页停摆了。" }} />
      </h1>
      <p className="lede">
        <T
          v={{
            en: "The address may have changed when the archive was reorganised into four sections.",
            zh: "档案重新整理为四个板块后，这个地址可能已经变更。",
          }}
        />
      </p>
      <Link className="text-link" href="/">
        <T v={{ en: "Return to the cover", zh: "回到首页" }} /> →
      </Link>
    </section>
  );
}
